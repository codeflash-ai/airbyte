package io.airbyte.integrations.destination.e2e_test

import io.airbyte.cdk.test.write.BasicFunctionalityIntegrationTest
import io.airbyte.commons.json.Jsons
import io.airbyte.protocol.models.v0.ConnectorSpecification

class E2eBasicFunctionalityIntegrationTest: BasicFunctionalityIntegrationTest(
    ConnectorSpecification()
        .withConnectionSpecification(Jsons.deserialize(
            """
            {}
            """.trimIndent()
        ))
)
