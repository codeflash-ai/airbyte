package io.airbyte.integrations.destination.e2e_test

import io.airbyte.cdk.test.util.DestinationRecordMangler
import io.airbyte.cdk.test.util.OutputRecord
import javax.inject.Singleton

@Singleton
class E2eDestinationRecordMangler: DestinationRecordMangler {
    override fun mangleRecord(expectedRecord: OutputRecord): OutputRecord {
        // E2e destination doesn't actually write records, so we shouldn't even
        // have tests that try to read back the records
        throw NotImplementedError()
    }
}
