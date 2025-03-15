// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CharityTracker {
    address public owner;
    
    struct Donation {
        address donor;
        string donorName;
        uint amount;
        uint timestamp;
    }

    struct Expense {
        string description;
        uint amount;
        uint timestamp;
    }

    Donation[] public donations;
    Expense[] public expenses;
    
    uint public totalDonations;
    uint public totalExpenses;

    event DonationReceived(address indexed donor, string donorName, uint amount, uint timestamp);
    event ExpenseAdded(string description, uint amount, uint timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function donate(string memory _donorName) external payable {
        require(msg.value > 0, "Donation must be greater than 0");

        donations.push(Donation(msg.sender, _donorName, msg.value, block.timestamp));
        totalDonations += msg.value;

        emit DonationReceived(msg.sender, _donorName, msg.value, block.timestamp);
    }

    function addExpense(string memory _description, uint _amount) external onlyOwner {
        require(_amount > 0, "Expense must be greater than 0");
        require(address(this).balance >= _amount, "Insufficient contract balance");

        expenses.push(Expense(_description, _amount, block.timestamp));
        totalExpenses += _amount;

        payable(owner).transfer(_amount);

        emit ExpenseAdded(_description, _amount, block.timestamp);
    }

    function getAllDonations() external view returns (Donation[] memory) {
        return donations;
    }

    function getAllExpenses() external view returns (Expense[] memory) {
        return expenses;
    }

    function getContractBalance() external view returns (uint) {
        return address(this).balance;
    }
}
