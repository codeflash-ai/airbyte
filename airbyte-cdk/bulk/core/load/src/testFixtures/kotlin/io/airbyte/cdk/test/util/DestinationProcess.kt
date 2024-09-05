package io.airbyte.cdk.test.util

import com.fasterxml.jackson.databind.JsonNode
import io.airbyte.cdk.Operation
import io.airbyte.cdk.command.CliRunner
import io.airbyte.cdk.command.ConfigurationJsonObjectBase
import io.airbyte.cdk.output.BufferingOutputConsumer
import io.airbyte.protocol.models.Jsons
import io.airbyte.protocol.models.v0.AirbyteMessage
import io.airbyte.protocol.models.v0.ConfiguredAirbyteCatalog
import io.micronaut.context.RuntimeBeanDefinition
import java.io.InputStream
import java.io.PipedInputStream
import java.io.PipedOutputStream
import java.io.PrintStream
import java.io.PrintWriter
import java.util.concurrent.CompletableFuture
import java.util.concurrent.Future
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
    private val destinationStdin = PipedInputStream()
    private val destinationStdinPipe = PrintWriter(PipedOutputStream(destinationStdin))
    // TODO CliRunner.runDestination() is blocking, so we can't use it directly
    //   but this is objectively wrong - we need to be able to stream the output
    //   throughout the sync, whereas right now we have to do
    //   destination.get().messages(). Which blocks until the whole destination
    //   finishes running.
    private val destination: Future<BufferingOutputConsumer> =
        CompletableFuture.supplyAsync {
            CliRunner.runDestination(
                command,
                config = config,
                catalog = catalog,
                // TODO is this really the right way to achieve this?
                beans = arrayOf(
                    RuntimeBeanDefinition.builder(InputStream::class.java) { destinationStdin }
                        .replaces(InputStream::class.java)
                        .build()
                )
            )
        }


    override fun sendMessage(message: AirbyteMessage) {
        destinationStdinPipe.println(Jsons.serialize(message))
    }

    override fun readMessages(): List<AirbyteMessage?> {
        // TODO define a better interface than null-terminated list
        //   (this will be easier once we have a real thing instead of CliRunner)
        return destination.get().messages() + listOf(null)
    }

    override fun waitUntilDone() {
        // Flush everything to destination's stdin
        destinationStdinPipe.close()
        // Then close stdin + wait for the destination to finish consuming it
        destinationStdin.close()
        // TODO actually wait
    }
}

// Notably, not actually a Micronaut factory. We want to inject the actual
// factory into our tests, not a pre-instantiated destination, because we want
// to run multiple destination processes per test.
// TODO only inject this when not running in CI, a la @Requires(notEnv = "CI")
@Singleton
class NonDockerizedDestinationFactory(
    private val config: ConfigurationJsonObjectBase
): DestinationProcessFactory() {
    override fun createDestinationProcess(
        command: String,
        catalog: ConfiguredAirbyteCatalog?
    ): DestinationProcess {
        return NonDockerizedDestination(command, config, catalog)
    }
}

// TODO define a factory for this class + @Require(env = CI)
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
