import React from 'react';
import { Svg, Path } from 'react-native-svg';

const ArrowRight = (props: { fill?: string, size?: string }) => {
  return (
    <Svg height={props.size || "50px"} width={props.size || "50px"} aria-hidden="true" data-prefix="fal" data-icon="angle-right" viewBox="0 0 192 512">
      <Path fill={props.fill} d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z">
      </Path>
    </Svg>
  );
}

export default ArrowRight;