package io.airbyte.integrations.destination.e2e_test

import io.airbyte.cdk.command.DestinationConfigurationFactory
import io.micronaut.context.annotation.Requires
import javax.inject.Singleton

@Singleton
@Requires(env = ["destination-e2e-logging"])
class E2eLoggingDestinationConfigurationFactory: DestinationConfigurationFactory<
    E2EDestinationConfigurationJsonObject, E2EDestinationConfiguration
    > {
    override fun makeWithoutExceptionHandling(pojo: E2EDestinationConfigurationJsonObject): E2EDestinationConfiguration {
        // TODO is this the right way to override a configuration?
        return E2EDestinationConfiguration(
            LoggingDestination(),
            1024L * 1024L
        )
    }
}
