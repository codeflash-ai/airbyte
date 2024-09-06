package io.airbyte.integrations.destination.e2e_test

import io.airbyte.cdk.test.write.BasicFunctionalityIntegrationTest
import io.airbyte.commons.json.Jsons
import io.airbyte.protocol.models.v0.AirbyteMessage
import io.airbyte.protocol.models.v0.AirbyteRecordMessage
import io.airbyte.protocol.models.v0.ConnectorSpecification
import kotlin.test.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test

class E2eBasicFunctionalityIntegrationTest: BasicFunctionalityIntegrationTest(
    ConnectorSpecification()
        .withConnectionSpecification(Jsons.deserialize(
            """
            {}
            """.trimIndent()
        ))
) {
    @Test
    fun testWrite() {
        val process = destinationProcessFactory.createDestinationProcess("write")
        process.sendMessage(
            AirbyteMessage()
                .withType(AirbyteMessage.Type.RECORD)
                .withRecord(AirbyteRecordMessage()
                    .withData(Jsons.deserialize("""{"foo": "bar"}""")))
        )

        // TODO Dirty hack - micronaut's startup time is long enough that if we immediately call
        //   waitUntilDone (which closes stdin), we'll close stdin before the destination even
        //   starts running, which causes weird errors.
        Thread.sleep(10_000)

        process.waitUntilDone()
        val messages = process.readMessages()
        println("Got messages: " + messages)
    }
}
