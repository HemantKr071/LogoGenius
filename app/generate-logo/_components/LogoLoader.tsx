"use client";
import React from 'react';
import styled from 'styled-components';

export const Generating = () => {
  return (
    <StyledWrapper1>
      <div className="loader">Generating...</div>
    </StyledWrapper1>
  );
}

const StyledWrapper1 = styled.div`
  @keyframes animate8345 {
    0%,100% {
      filter: hue-rotate(0deg);
    }

    50% {
      filter: hue-rotate(360deg);
    }
  }

  .loader {
    color: rgb(0, 0, 0);
    background: linear-gradient(to right, #2d60ec, #3ccfda);
    font-size: 40px;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    animation: animate8345 9s linear infinite;
    font-weight: bold;
  }`;



  
  export const Loader = () => {
    return (
      <StyledWrapper>
        <div className="loading-wave">
          <div className="loading-bar" />
          <div className="loading-bar" />
          <div className="loading-bar" />
          <div className="loading-bar" />
        </div>
      </StyledWrapper>
    );
  }
  
  const StyledWrapper = styled.div`
    .loading-wave {
      width: 300px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }
  
    .loading-bar {
      width: 20px;
      height: 60px;
      margin: 0 5px;
      background-color: #3498db;
      border-radius: 5px;
      animation: loading-wave-animation 1s ease-in-out infinite;
    }
  
    .loading-bar:nth-child(2) {
      animation-delay: 0.1s;
    }
  
    .loading-bar:nth-child(3) {
      animation-delay: 0.2s;
    }
  
    .loading-bar:nth-child(4) {
      animation-delay: 0.3s;
    }
  
    @keyframes loading-wave-animation {
      0% {
        height: 10px;
      }
  
      50% {
        height: 50px;
      }
  
      100% {
        height: 10px;
      }
    }`;
  
  

