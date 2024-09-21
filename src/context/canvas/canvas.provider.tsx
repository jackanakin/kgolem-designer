import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  addEdge,
  ColorMode,
  Edge,
  FinalConnectionState,
  OnConnect,
  OnConnectStartParams,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import HandleFactory from "./handle.factory";
import { DefaultProviderProps } from "../types";
import { nodeTypes } from "../../pages/canvas/components/nodes";
import { edgeTypes } from "../../pages/canvas/components/edges";
import { AppNode } from "../../pages/canvas/components/nodes/types";
import { useDnD } from "../dnd/dnd.provider";
import { Container, ReactFlowWrapper } from "./styles";
import { WhatsAppSidebar } from "../../pages/canvas/components/sidebars/whatsapp";

interface CanvasContextProps {
  nodeEntered?: AppNode;
  connectStartParams?: OnConnectStartParams;
  edges: Edge[];
}

const CanvasContext = React.createContext<CanvasContextProps>(null!);

const initialNodes: AppNode[] = [
  {
    id: "e",
    type: "WAStart",
    position: { x: 0, y: 250 },
    data: { label: "wa-start", handles: [] },
  },
  {
    id: "f",
    type: "WAPlainText",
    position: { x: 100, y: 250 },
    data: { label: "wa-plaintext", handles: [] },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

export function CanvasProvider(props: DefaultProviderProps) {
  const reactFlowWrapper = useRef(null);

  const [colorMode] = useState<ColorMode>("dark");

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { screenToFlowPosition } = useReactFlow();
  const { type } = useDnD();

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((edges) => addEdge({ ...connection, animated: true }, edges));
    },
    [setEdges]
  );

  const [nodeEntered, setNodeEntered] = useState<AppNode | undefined>(
    undefined
  );
  const [connectStartParams, setConnectStartParams] =
    useState<OnConnectStartParams>();

  const onNodeMouseEnter = (_event: unknown, node: AppNode) =>
    setNodeEntered(node);

  const onNodeMouseLeave = () => setNodeEntered(undefined);

  const onConnectStart = (_event: unknown, params: OnConnectStartParams) => {
    setConnectStartParams(params);
  };

  const onConnectEnd = (_event: unknown, _params: FinalConnectionState) => {
    setConnectStartParams(undefined);
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const handleFactory = new HandleFactory();
      const uuid = getId();
      const handles = handleFactory.createEmptyHandlesForNode(uuid);

      const newNode = {
        id: uuid,
        type,
        position,
        data: { label: `${type} node`, handles },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes, type]
  );

  useEffect(() => {
    const handleFactory = new HandleFactory();

    setNodes(() => {
      return initialNodes.map((node) => {
        const handles = handleFactory.createEmptyHandlesForNode(node.id);
        return {
          ...node,
          data: {
            uuid: "",
            ...node.data,
            handles,
          },
        };
      });
    });
  }, [setEdges, setNodes]);

  return (
    <CanvasContext.Provider
      value={{
        nodeEntered,
        connectStartParams,
        // nodes,
        edges,
      }}
    >
      <Container>
        <ReactFlowWrapper ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            elementsSelectable={true}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeMouseEnter={onNodeMouseEnter}
            onNodeMouseLeave={onNodeMouseLeave}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onConnect={onConnect}
            colorMode={colorMode}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            {props.children}
          </ReactFlow>
        </ReactFlowWrapper>
        <WhatsAppSidebar />
      </Container>
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  return React.useContext(CanvasContext);
}
