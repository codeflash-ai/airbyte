package io.airbyte.cdk.test.util

import com.fasterxml.jackson.databind.JsonNode
import io.airbyte.cdk.Operation
import io.airbyte.cdk.command.CliRunner
import io.airbyte.cdk.command.ConfigurationJsonObjectBase
import io.airbyte.cdk.output.BufferingOutputConsumer
import io.airbyte.protocol.models.v0.AirbyteMessage
import io.airbyte.protocol.models.v0.ConfiguredAirbyteCatalog
import javax.inject.Singleton

// This whole file is very wishy-washy, until we figure out the exact
// micronaut stuff. But it's directionally correct, and I'd rather nail down
// the actual test stuff first.
interface DestinationProcess {
    fun sendMessage(message: AirbyteMessage)

    /**
     * Return all messages from the destination. When the destination exits, the last message
     * MUST be `null`.
     *
     * (mediocre interface, just for demo purposes)
     */
    fun readMessages(): List<AirbyteMessage?>

    fun waitUntilDone()
}

abstract class DestinationProcessFactory {
    abstract fun createDestinationProcess(
        command: String,
        catalog: ConfiguredAirbyteCatalog? = null,
    ): DestinationProcess
}

class NonDockerizedDestination(
    command: String,
    config: ConfigurationJsonObjectBase?,
    catalog: ConfiguredAirbyteCatalog?,
): DestinationProcess {
    // invoke whatever CDK stuff exists to run a destination connector
    // but use some reasonable interface instead of stdin/stdout
    // maybe we don't use literal actual CliRunner, but it's something like this
    private val destination: BufferingOutputConsumer =
        CliRunner.runDestination(command, config = config, catalog = catalog)

    override fun sendMessage(message: AirbyteMessage) {
        TODO("Not yet implemented")
    }

    override fun readMessages(): List<AirbyteMessage?> {
        return destination.messages() + listOf(null)
    }

    override fun waitUntilDone() {
        // send a "stdin closed" signal
        TODO("Not yet implemented")
    }
}

@Singleton
class NonDockerizedDestinationFactory(
    val config: ConfigurationJsonObjectBase
): DestinationProcessFactory() {
    override fun createDestinationProcess(
        command: String,
        catalog: ConfiguredAirbyteCatalog?
    ): DestinationProcess {
        return NonDockerizedDestination(command, config, catalog)
    }
}

class DockerizedDestination(
    command: String,
    config: JsonNode?,
    catalog: ConfiguredAirbyteCatalog?,
): DestinationProcess {
    init {
        // launch a docker container...
    }

    override fun sendMessage(message: AirbyteMessage) {
        // push a message to the docker process' stdin
        TODO("Not yet implemented")
    }

    override fun readMessages(): List<AirbyteMessage?> {
        // read everything from the process' stdout
        TODO("Not yet implemented")
    }

    override fun waitUntilDone() {
        // close stdin, wait until process exits
        TODO("Not yet implemented")
    }
}
