# Copyright (c) 2023 Airbyte, Inc., all rights reserved.
"""A simple test of AirbyteLib, using the Faker source connector.

Usage (from airbyte-lib root directory):
> poetry run python ./examples/run_faker.py

No setup is needed, but you may need to delete the .venv-source-faker folder
if your installation gets interrupted or corrupted.
"""
from __future__ import annotations

from typing import TYPE_CHECKING

import airbyte_lib as ab
from airbyte_lib.caches import NullCache


if TYPE_CHECKING:
    from airbyte_lib.caches.base import SQLCacheBase


SCALE = 1_000_000 # Number of records to generate between users and purchases.
NULL_CACHE = False # Set to True to use the Null cache instead of DuckDB.


source = ab.get_connector(
    "source-faker",
    pip_url="-e ../airbyte-integrations/connectors/source-faker",
    config={"count": SCALE / 2},
    install_if_missing=True,
)
source.check()
source.set_streams(["products", "users", "purchases"])

cache: SQLCacheBase = NullCache() if NULL_CACHE else ab.new_local_cache()

result = source.read(cache)

if not NULL_CACHE:
    for name, records in result.cache.streams.items():
        print(f"Stream {name}: {len(list(records))} records")
