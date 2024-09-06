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
}
