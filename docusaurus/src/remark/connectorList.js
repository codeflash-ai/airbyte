const visit = require("unist-util-visit").visit;
const { catalog, isPyAirbyteConnector } = require("../connector_registry");

const plugin = () => {
  const transformer = async (ast, vfile) => {

    const registry = await catalog;

    visit(ast, "mdxJsxFlowElement", (node) => {
      if (node.name !== "PyAirbyteConnectors") return;

        const connectors = registry.filter(isPyAirbyteConnector);

      node.attributes.push({
        type: "mdxJsxAttribute",
        name: "connectorsJSON",
        value: JSON.stringify(connectors)
      });
    });
  };
  return transformer;
};

module.exports = plugin;
