import React, { ComponentType } from 'react'

const withOverlay = <P extends {}>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const FinalComponent: React.FC<P> = (props) => {
    return (
      <div className=' fixed inset-0 z-10 flex items-center justify-center'>
        <div className='fixed inset-0 bg-black z-10 opacity-60'></div>
        <WrappedComponent {...props} />
      </div>
    )
  }

  return FinalComponent
}

export default withOverlay
