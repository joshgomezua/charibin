import * as React from 'react'

type RC<P> = React.ComponentType<P>
type HOC<O, P> = (C: RC<O>) => RC<P>

export const compose = <P>(C: RC<P>, ...hocs: HOC<any, any>[]): RC<P> =>
  hocs.reduce((g, f) => f(g), C)
