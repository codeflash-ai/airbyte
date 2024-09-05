package io.airbyte.cdk.test.util

import io.micronaut.test.extensions.junit5.annotation.MicronautTest
import java.util.concurrent.atomic.AtomicInteger
import javax.inject.Singleton
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.parallel.Execution
import org.junit.jupiter.api.parallel.ExecutionMode

@MicronautTest
@Execution(ExecutionMode.CONCURRENT)
@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class DestE2eIntegrationTest {
    @Test
    fun test1(o: StatefulObject) {
        println("counter was " + o.counter.incrementAndGet())
    }

    @Test
    fun test2(o: StatefulObject) {
        println("counter was " + o.counter.incrementAndGet())
    }
}

@Singleton
class StatefulObject {
    val counter = AtomicInteger(0)
}
