package io.airbyte.integrations.destination.e2e_test

import io.airbyte.cdk.test.write.BasicFunctionalityIntegrationTest
import io.airbyte.commons.json.Jsons
import io.airbyte.protocol.models.v0.AirbyteMessage
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
        val messages = process.readMessages()
    }
}
