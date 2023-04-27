import React from 'react';
import styled from 'styled-components';

const BottomNavWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.25);
`;

const NavButton = styled.button`
  flex-grow: 1;
  padding: 10px;
  border: none;
  background-color: #fff;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`;

const PrimaryButton = styled(NavButton)`
  background-color: #008cff;
  color: #fff;
`;

const SecondaryButton = styled(NavButton)`
  background-color: #fff;
  color: #008cff;
`;

interface Props {
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick: () => void;
}

const BottomNavigation: React.FC<Props> = ({
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}) => {
  return (
    <BottomNavWrapper>
      <SecondaryButton onClick={onSecondaryButtonClick}>
        {secondaryButtonText}
      </SecondaryButton>
      <PrimaryButton onClick={onPrimaryButtonClick}>
        {primaryButtonText}
      </PrimaryButton>
    </BottomNavWrapper>
  );
};

export default BottomNavigation;



import BottomNavigation from './BottomNavigation';

function MyComponent() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <BottomNavigation
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onPrimaryButtonClick={() => console.log('Save clicked')}
        onSecondaryButtonClick={() => console.log('Cancel clicked')}
      />
    </div>
  );
}
