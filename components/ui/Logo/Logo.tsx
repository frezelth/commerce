import React from 'react'

const Logo  = ({ className = '', ...props }) => {

  return (<>
                  <span className="sr-only">UJOO</span>
                  <img src="/logo.svg" alt="UJOO" width={90}>
                  </img>
    </>
  )
}

export default Logo
