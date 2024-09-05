package io.airbyte.cdk.test.write

import io.airbyte.cdk.test.util.IntegrationTest
import io.airbyte.protocol.models.v0.AirbyteMessage
import io.airbyte.protocol.models.v0.ConnectorSpecification
import kotlin.test.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test

open class BasicFunctionalityIntegrationTest(
    // TODO maybe pull this out of spec.json??
    val expectedSpec: ConnectorSpecification
): IntegrationTest() {
    @Test
    open fun testSpec() {
        val process = destinationProcessFactory.createDestinationProcess("spec")
        val messages = process.readMessages()
        val specMessage = messages.filterNotNull()
            .firstOrNull { it.type == AirbyteMessage.Type.SPEC }

        assertNotNull(specMessage)
        assertEquals(expectedSpec, specMessage!!.spec)
    }
}
