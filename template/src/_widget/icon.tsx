/**
 * Icon Component
 * inline svg to html
 */

import classnames from 'classnames'
import React from 'react'

declare const require: Function

export interface IconPropType {
  type: string
  className?: string
  style?: React.CSSProperties
  size?: number
  onClick?: (e?: any) => void
}

export default class Icon extends React.PureComponent<IconPropType, {}> {
  static defaultProps = {
    size: 16,
  }
  
  renderSvg = () => {
    let svg
    try {
      svg = require(`asset/${this.props.type}.svg`)
    } catch (e) {
    
    } finally {
      return svg
    }
  }
  
  render() {
    const {
      className,
      style,
      type,
      size,
      ...restProps
    } = this.props
    
    let xlinkHref = this.renderSvg()
    
    if (!xlinkHref) {
      xlinkHref = type
    } else {
      xlinkHref = `#${type}`
    }
    
    const iconClassName = classnames(className)
    
    return (
      <svg width={size} height={size} className={iconClassName} style={style} {...restProps}>
        <use xlinkHref={xlinkHref}/>
      </svg>
    )
  }
}
