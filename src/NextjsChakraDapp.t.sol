// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "ds-test/test.sol";

import "./NextjsChakraDapp.sol";

contract NextjsChakraDappTest is DSTest {
    NextjsChakraDapp dapp;

    function setUp() public {
        dapp = new NextjsChakraDapp();
    }

    function testFail_basic_sanity() public {
        assertTrue(false);
    }

    function test_basic_sanity() public {
        assertTrue(true);
    }
}
