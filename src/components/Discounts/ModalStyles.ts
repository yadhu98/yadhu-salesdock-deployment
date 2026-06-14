import styled from 'styled-components';

export const PillButton = styled.button<{ active: boolean }>`
  flex: 1;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.active ? '#17a2b8' : '#f0f2f5'};
  color: ${props => props.active ? '#ffffff' : '#7a8a9e'};
  transition: all 0.2s ease-in-out;
`;

export const CircleCheck = styled.span<{ active: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #17a2b8;
  font-size: 11px;
  font-weight: bold;
  visibility: ${props => props.active ? 'visible' : 'hidden'};
`;

export const StyledDropdown = styled.select`
  border: 1px solid #ced4da;
  background-color: #f8f9fa;
  padding: 0 16px;
  border-radius: 4px 0 0 4px;
  border-right: none;
  font-weight: bold;
  outline: none;
`;