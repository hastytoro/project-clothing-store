import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const DirectoryItem = ({ id, imageUrl, title, route }) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(route);
  return (
    <DirectoryItemContainer onClick={handleNavigate}>
      <BackgroundImage imageUrl={imageUrl} />
      <DirectoryBody>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectoryBody>
    </DirectoryItemContainer>
  );
};

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${(props) => `url(${props.imageUrl})`};
`;

const DirectoryBody = styled.div`
  position: absolute;
  height: 90px;
  padding: 0 25px;
  display: flex;
  /* centering text content */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;

  h2 {
    font-weight: normal;
    margin: 0 6px 0;
    font-size: 22px;
    color: #4a4a4a;
    text-transform: uppercase;
  }
  p {
    font-weight: lighter;
    font-size: 16px;
  }
`;

const DirectoryItemContainer = styled.div`
  min-width: 30%;
  /* max-width: 100%; */
  height: 240px;
  flex: 1 1 auto;
  /* centering child body */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  margin: 0 7.5px 15px;
  /* Here we preventing the card from overflowing when transform */
  overflow: hidden;

  &:hover {
    cursor: pointer;
    & ${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
    & ${DirectoryBody} {
      opacity: 0.9;
    }
  }

  /* &:first-child {
    margin-right: 7.5px;
  }
  &:last-child {
    margin-left: 7.5px;
  } */
`;

export default DirectoryItem;
