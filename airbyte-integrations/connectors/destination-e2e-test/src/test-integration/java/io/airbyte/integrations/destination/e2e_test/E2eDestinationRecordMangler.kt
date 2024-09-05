package io.airbyte.integrations.destination.e2e_test

import io.airbyte.cdk.test.util.DestinationRecordMangler
import io.airbyte.cdk.test.util.OutputRecord
import javax.inject.Singleton

@Singleton
class E2eDestinationRecordMangler: DestinationRecordMangler {
    override fun mangleRecord(expectedRecord: OutputRecord): OutputRecord {
        throw NotImplementedError()
    }
}
