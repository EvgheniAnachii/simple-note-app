import styled from "styled-components";
import {FC} from "react";

const LoadingStyled = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 10vh;
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