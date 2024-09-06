package io.airbyte.cdk.test.write

import io.airbyte.cdk.test.util.IntegrationTest
import io.airbyte.cdk.test.util.OutputRecord
import io.airbyte.protocol.models.Jsons
import io.airbyte.protocol.models.v0.AirbyteConnectionStatus
import io.airbyte.protocol.models.v0.AirbyteMessage
import io.airbyte.protocol.models.v0.AirbyteRecordMessage
import io.airbyte.protocol.models.v0.AirbyteStream
import io.airbyte.protocol.models.v0.AirbyteStreamStatusTraceMessage
import io.airbyte.protocol.models.v0.AirbyteTraceMessage
import io.airbyte.protocol.models.v0.ConfiguredAirbyteCatalog
import io.airbyte.protocol.models.v0.ConfiguredAirbyteStream
import io.airbyte.protocol.models.v0.ConnectorSpecification
import io.airbyte.protocol.models.v0.DestinationSyncMode
import io.airbyte.protocol.models.v0.StreamDescriptor
import io.github.oshai.kotlinlogging.KotlinLogging
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test

private val logger = KotlinLogging.logger {}

abstract class BasicFunctionalityIntegrationTest(
    // TODO maybe pull this out of spec.json??
    val expectedSpec: ConnectorSpecification
): IntegrationTest() {
    @Test
    open fun testSpec() {
        val process = destinationProcessFactory.createDestinationProcess("spec")
        process.waitUntilDone()
        val messages = process.readMessages()
        val specMessages = messages.filter { it != null && it.type == AirbyteMessage.Type.SPEC }

        assertEquals(
            specMessages.size,
            1,
            "Expected to receive exactly one spec message, but got ${specMessages.size}: $specMessages"
        )
        assertEquals(expectedSpec, specMessages.first()!!.spec)
    }

    // Assumes that there's some config being injected elsewhere magically...
    // TODO is that right?
    @Test
    open fun testCheck() {
        val process = destinationProcessFactory.createDestinationProcess("check")
        process.waitUntilDone()
        val messages = process.readMessages()
        val checkMessages = messages.filter { it != null && it.type == AirbyteMessage.Type.CONNECTION_STATUS }

        // TODO is this correct?
        assertEquals(
            checkMessages.size,
            1,
            "Expected to receive exactly one connection status message, but got ${checkMessages.size}: $checkMessages"
        )
        assertEquals(
            AirbyteConnectionStatus.Status.SUCCEEDED,
            checkMessages.first()!!.connectionStatus.status
        )
    }

    @Test
    open fun testBasicWrite() {
        // TODO extract this pile of stuff to IntegrationTest.runSync
        val process = destinationProcessFactory.createDestinationProcess(
            "write",
            ConfiguredAirbyteCatalog()
                .withStreams(
                    listOf(
                        ConfiguredAirbyteStream()
                            .withDestinationSyncMode(DestinationSyncMode.APPEND)
                            .withGenerationId(0)
                            .withMinimumGenerationId(0)
                            .withSyncId(42)
                            .withStream(
                                AirbyteStream()
                                    .withName("test_stream")
                                    .withNamespace(randomizedNamespace)
                                    .withJsonSchema(
                                        Jsons.deserialize(
                                            """
                                            {
                                              "type": "object",
                                              "properties": {
                                                "id": {"type": "integer"}
                                              }
                                            }
                                            """.trimIndent()
                                        )
                                    )
                            )
                    )
                )
        )
        process.sendMessage(
            AirbyteMessage()
                .withType(AirbyteMessage.Type.RECORD)
                .withRecord(
                    AirbyteRecordMessage()
                        .withStream("test_stream")
                        .withNamespace(randomizedNamespace)
                        .withEmittedAt(1234)
                        .withData(Jsons.deserialize("""{"id": 5678}"""))
                )
        )
        process.sendMessage(
            AirbyteMessage()
                .withType(AirbyteMessage.Type.TRACE)
                .withTrace(
                    AirbyteTraceMessage()
                        .withType(AirbyteTraceMessage.Type.STREAM_STATUS)
                        .withStreamStatus(
                            AirbyteStreamStatusTraceMessage()
                                .withStreamDescriptor(
                                    StreamDescriptor()
                                        .withName("test_stream")
                                        .withNamespace(randomizedNamespace)
                                ).withStatus(AirbyteStreamStatusTraceMessage.AirbyteStreamStatus.COMPLETE)
                        )
                )
        )

        // TODO Dirty hack - micronaut's startup time is long enough that if we immediately call
        //   waitUntilDone (which closes stdin), we'll close stdin before the destination even
        //   starts running, which causes weird errors.
        Thread.sleep(10_000)

        process.waitUntilDone()
        process.readMessages()
            .filterNotNull()
            .forEach {
            if (it.type == AirbyteMessage.Type.LOG) {
                logger.info {it.log.message.toString()}
            }
        }

        dumpAndDiffRecords(
            listOf(
                OutputRecord(
                    extractedAt = 1234,
                    generationId = 0,
                    data = mapOf("id" to 5678),
                    airbyteMeta = """{"changes": []}"""
                )
            ),
            "test_stream",
            randomizedNamespace
        )
    }
}
