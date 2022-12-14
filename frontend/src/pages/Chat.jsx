import React, { useEffect, useState,useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRoute,host } from "../utilis/apiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
const {REACT_APP_CHAT_APP} =process.env
const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  useEffect(() => {
    if (!localStorage.getItem(REACT_APP_CHAT_APP)) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem(REACT_APP_CHAT_APP)));
     
    }
  }, [navigate]);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const aLLUsers = async () => {
      const data = await axios.get(`${allUsersRoute }/${currentUser._id}`);
     
      setContacts(data.data);
    };
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        aLLUsers();
      } else {
        navigate("/setavatar");
      }
    } 
  });
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
       <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
       
        {currentChat === undefined ?
          <Welcome/>
          :<ChatContainer currentChat={currentChat} socket={socket} />
        }
        
        
       </div>
      </Container>
    </>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
