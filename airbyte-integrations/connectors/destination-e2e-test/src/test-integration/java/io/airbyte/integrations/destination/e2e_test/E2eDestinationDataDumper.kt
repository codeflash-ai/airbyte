package io.airbyte.integrations.destination.e2e_test

import io.airbyte.cdk.test.util.DestinationDataDumper
import io.airbyte.cdk.test.util.OutputRecord
import javax.inject.Singleton

@Singleton
class E2eDestinationDataDumper: DestinationDataDumper {
    override fun dumpRecords(streamName: String, streamNamespace: String?): List<OutputRecord> {
        throw NotImplementedError()
    }
}
