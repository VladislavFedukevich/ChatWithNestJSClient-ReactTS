import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    color: #007991;
    font-size: 34px;
    font-weight: 800;
    text-transform: uppercase;
`

export const UsersListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  text-align: center;
`;

export const UserList = styled.div`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  overflow-y: auto;
  padding: 16px;
  margin-top: 16px;
  color: white;
  margin: 20px auto;
`;

export const User = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #007991;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    background-color: #1e7377;
    color: white;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
`;
