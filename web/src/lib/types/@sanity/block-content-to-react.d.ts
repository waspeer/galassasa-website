declare module '@sanity/block-content-to-react' {
  interface BaseSerializerProps<T extends Record<string, any> = any> {
    node: T;
    children: React.ReactNode;
  }

  interface WithMark {
    mark: any;
  }

  type Serializer<T extends Record<string, any> = any> = React.FunctionComponent<
    BaseSerializerProps<T>
  >;
  type MarkSerializer<T extends Record<string, any> = any> = React.FunctionComponent<
    BaseSerializerProps<T> & WithMark
  >;

  interface BlockContentProps {
    blocks: any[];

    /**
     * When more than one block is given, a container node has to be created.
     * Passing a className will pass it on to the container.
     * Note: see renderContainerOnSingleChild.
     */
    className?: string;

    /**
     * When a single block is given as input, the default behavior is to not render any container.
     * If you always want to render the container, pass true.
     */
    renderContainerOnSingleChild?: boolean;

    /**
     * Specifies the React components to use for rendering content. Merged with default serializers.
     */
    serializers?: {
      /**
       * Serializers for block types, see example above
       */
      types?: Record<string, Serializer>;

      /**
       * Serializers for marks - data that annotates a text child of a block. See example usage below.
       */
      marks?: Record<string, MarkSerializer>;

      /**
       * React component to use when rendering a list node
       */
      list?: Serializer;

      /**
       * React component to use when rendering a list item node
       */
      listItem?: Serializer;

      /**
       * React component to use when transforming newline characters to a hard break
       * (<br/> by default, pass false to render newline character)
       */
      hardBreak?: JSX.Element | false;

      /**
       * Serializer for the container wrapping the blocks
       */
      container?: Serializer;
    };

    /**
     * When encountering image blocks, this defines which query parameters to apply in order to control size/crop mode etc.
     */
    imageOptions?: Record<string, any>;

    /**
     * The ID of your Sanity project.
     */
    projectId?: string;

    /**
     * Name of the Sanity dataset containing the document that is being rendered.
     */
    dataset?: string;
  }

  declare const BlockContent: React.FunctionComponent<BlockContentProps>;

  export default BlockContent;
}
