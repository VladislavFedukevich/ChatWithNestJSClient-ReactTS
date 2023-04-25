import styled from "styled-components";

export const UsersListWrapper = styled.div`
    margin: 200px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const UserList = styled.div`
    flex: 1;
    padding: 16px;
    background-color: #f5f5f5;
    overflow-y: auto;
    width: 100%;
    max-width: 400px;
    margin-top: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const User = styled.div`
    padding: 8px;
    margin-bottom: 8px;
    background-color: #007bff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #fff;
        color: black;  
    }
    color: #fff;
`;

export const Title = styled.h2`
    margin-top: 32px;
    margin-bottom: 16px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #007bff;
`;
