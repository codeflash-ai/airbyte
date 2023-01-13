/*
 * Copyright (c) 2022 Airbyte, Inc., all rights reserved.
 */

package io.airbyte.config.init;

import io.airbyte.config.StandardDestinationDefinition;
import io.airbyte.config.StandardSourceDefinition;
import io.airbyte.config.persistence.ConfigNotFoundException;
import java.util.List;
import java.util.UUID;

public interface DefinitionsProvider {

  void loadDefinitions();

  StandardSourceDefinition getSourceDefinition(final UUID definitionId) throws ConfigNotFoundException;

  List<StandardSourceDefinition> getSourceDefinitions();

  StandardDestinationDefinition getDestinationDefinition(final UUID definitionId) throws ConfigNotFoundException;

  List<StandardDestinationDefinition> getDestinationDefinitions();

}
