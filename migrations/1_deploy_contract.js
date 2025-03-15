const CharityTracker = artifacts.require("CharityTracker");

module.exports = function (deployer) {
    deployer.deploy(CharityTracker);
};
