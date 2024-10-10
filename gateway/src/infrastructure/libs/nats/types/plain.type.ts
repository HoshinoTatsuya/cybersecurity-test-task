export type PlainType<Source> = Pick<
  Source,
  // eslint-disable-next-line @typescript-eslint/ban-types
  { [K in keyof Source]: Source[K] extends Function ? never : K }[keyof Source]
>
