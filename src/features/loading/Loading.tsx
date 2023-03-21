import styled from "styled-components";
import {FC} from "react";

const LoadingStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(109 122 109 / 20%);
  text-align: center;
  padding-top: 50vh;
`
type LoadingPropsType = {
	text?: string
	isLoading: boolean
}
const Loading: FC<LoadingPropsType> = ({text = 'Loading...', isLoading}) => {
	return <>
		{isLoading ? <LoadingStyled>{text}</LoadingStyled> : null }
	</>
}

export default Loading