package io.airbyte.cdk.test.util

import io.airbyte.protocol.models.v0.AirbyteMessage
import io.airbyte.protocol.models.v0.ConfiguredAirbyteCatalog
import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.test.extensions.junit5.annotation.MicronautTest
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import javax.inject.Inject
import kotlin.test.assertNull
import kotlin.test.fail
import org.apache.commons.lang3.RandomStringUtils
import org.junit.jupiter.api.parallel.Execution
import org.junit.jupiter.api.parallel.ExecutionMode

private val logger = KotlinLogging.logger {}

@MicronautTest
@Execution(ExecutionMode.CONCURRENT)
abstract class IntegrationTest<Config: Any> {
    // Intentionally don't inject the actual destination process - we need a full factory
    // because some tests want to run multiple syncs, so we need to run the destination
    // multiple times.
    @Inject lateinit var destinationProcessFactory: DestinationProcessFactory<Config>
    // Maybe inject the config? Different test classes need to inject different
    // configs (e.g. bigquery: gcs staging vs direct load, raw namespace override, etc.)
    // TODO figure out the whole default namespace thing
    @Inject lateinit var config: Config
    @Inject lateinit var dataDumper: DestinationDataDumper
    @Inject lateinit var recordMangler: DestinationRecordMangler

    private val randomSuffix = RandomStringUtils.randomAlphabetic(4)
    private val timestampString =
        LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC)
            .format(DateTimeFormatter.ofPattern("YYYYMMDD"))
    // stream name doesn't need to be randomized, only the namespace.
    // we need braces because otherwise kotlin tries to find a val `timestampString_`
    val randomizedNamespace = "test${timestampString}$randomSuffix"

    fun dumpAndDiffRecords(
        canonicalExpectedRecords: List<OutputRecord>,
        streamName: String,
        streamNamespace: String?,
    ) {
        val actualRecords: List<OutputRecord> = dataDumper.dumpRecords(streamName, streamNamespace)
        val expectedRecords: List<OutputRecord> = canonicalExpectedRecords.map { recordMangler.mangleRecord(it) }

        RecordDiffer(
            // TODO accept these from the actual test
            //   in particular, these need to be destinationified names
            //   (e.g. snowflake uppercase ID)
            { record -> listOf(record.data["id"]) },
            { record -> record.data["updated_at"] },
        ).diffRecords(expectedRecords, actualRecords)
            ?.let(::fail)
    }

    fun runSync(
        catalog: ConfiguredAirbyteCatalog,
        messages: List<AirbyteMessage>,
    ) {
        val destination = destinationProcessFactory.createDestinationProcess(
            "write",
            config,
            catalog,
        )
        TODO()
    }
}

fun interface DestinationDataDumper {
    // TODO we probably should compact this pair into a useful class
    //   (but not StreamDescriptor/AirbyteStreamNameNamespacePair :P )
    fun dumpRecords(streamName: String, streamNamespace: String?): List<OutputRecord>
}

fun interface DestinationRecordMangler {
    fun mangleRecord(expectedRecord: OutputRecord): OutputRecord
}
