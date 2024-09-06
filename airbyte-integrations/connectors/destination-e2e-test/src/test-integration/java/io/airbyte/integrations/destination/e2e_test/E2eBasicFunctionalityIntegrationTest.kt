package io.airbyte.integrations.destination.e2e_test

import io.airbyte.cdk.test.write.BasicFunctionalityIntegrationTest
import io.airbyte.commons.json.Jsons
import io.airbyte.protocol.models.v0.ConnectorSpecification
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
    override fun testSpec() {
        super.testSpec()
    }

    @Test
    override fun testCheck() {
        super.testCheck()
    }

//    @Disabled("this destination doesn't actually write any data, so disable the write smoke test")
    @Test
    override fun testBasicWrite() {
        super.testBasicWrite()
    }
}
