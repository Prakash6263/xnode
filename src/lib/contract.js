// Smart Contract Integration for BSC Testnet
import { ethers } from "ethers"

export const CONTRACT_ADDRESS = "0x05870aBC78b9e7223761C7D70A48DF14063aB2f6"

// BSC Testnet RPC URL
export const BSC_TESTNET_RPC = "https://data-seed-prebsc-1-s1.binance.org:8545/"

// Contract ABI for startTokenSale function
export const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "allowance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "approver", type: "address" }],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "spender", type: "address" }],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  { inputs: [], name: "EnforcedPause", type: "error" },
  { inputs: [], name: "ExpectedPause", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "spender", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "saleId", type: "uint256" },
    ],
    name: "BoughtTokens",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "saleId", type: "uint256" }],
    name: "SaleCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "duration", type: "uint256" },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "claimed",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "_saleType", type: "uint8" }],
    name: "buyTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "_rate", type: "uint256" },
    ],
    name: "calculateToken",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBNBbalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_saleId", type: "uint256" }],
    name: "isActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minimumStakingAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleM",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "salesDetailMap",
    outputs: [
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "end", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "uint256", name: "totalTokens", type: "uint256" },
      { internalType: "uint256", name: "tokenSold", type: "uint256" },
      { internalType: "uint256", name: "minBound", type: "uint256" },
      { internalType: "uint256", name: "raisedIn", type: "uint256" },
      { internalType: "uint256", name: "remainingToken", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint256", name: "_durationInDays", type: "uint256" },
    ],
    name: "stakeTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_saleType", type: "uint256" },
      { internalType: "uint256", name: "_start", type: "uint256" },
      { internalType: "uint256", name: "_end", type: "uint256" },
      { internalType: "uint256", name: "_price", type: "uint256" },
      { internalType: "uint256", name: "_minBound", type: "uint256" },
      { internalType: "uint256", name: "_totalTokens", type: "uint256" },
    ],
    name: "startTokenSale",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userStakingMap",
    outputs: [
      { internalType: "uint256", name: "stakeAmount", type: "uint256" },
      { internalType: "uint256", name: "claimed", type: "uint256" },
      { internalType: "uint256", name: "lastClaimedTime", type: "uint256" },
      { internalType: "uint256", name: "lockingPeriod", type: "uint256" },
      { internalType: "uint256", name: "totalReward", type: "uint256" },
      { internalType: "uint256", name: "rewardPerWeek", type: "uint256" },
      { internalType: "uint256", name: "stakeStartTime", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "userTokenMap",
    outputs: [
      { internalType: "uint256", name: "saleRound", type: "uint256" },
      { internalType: "uint256", name: "tokenspurchased", type: "uint256" },
      { internalType: "uint256", name: "createdOn", type: "uint256" },
      { internalType: "uint256", name: "remainingTokens", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawBNB",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]

// BSC Testnet Chain Configuration
export const BSC_TESTNET_CONFIG = {
  chainId: "0x61", // 97 in decimal
  chainName: "BSC Testnet",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: [BSC_TESTNET_RPC],
  blockExplorerUrls: ["https://testnet.bscscan.com/"],
}

// Connect to MetaMask wallet
export const connectWallet = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" })

      // Switch to BSC Testnet if not already connected
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: BSC_TESTNET_CONFIG.chainId }],
        })
      } catch (switchError) {
        // If BSC Testnet is not added, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [BSC_TESTNET_CONFIG],
          })
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      return { provider, signer, address }
    } catch (error) {
      throw new Error("Failed to connect wallet: " + error.message)
    }
  } else {
    throw new Error("MetaMask is not installed")
  }
}

// Get contract instance
export const getContract = async () => {
  const { signer } = await connectWallet()
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
}

// Convert datetime to Unix timestamp
export const dateTimeToTimestamp = (dateTimeString) => {
  return Math.floor(new Date(dateTimeString).getTime() / 1000)
}

// Convert price to Wei (assuming 18 decimals)
export const priceToWei = (price) => {
  console.log("[v0] priceToWei input:", price, typeof price)

  if (!price || price === "" || price === null || price === undefined) {
    throw new Error(`Price is required. Received: ${price}`)
  }

  // Convert to string and check for scientific notation
  const priceStr = String(price).trim()
  console.log("[v0] priceStr:", priceStr)

  // Check for scientific notation (e.g., "2e-18", "1.5e+10")
  if (priceStr.includes("e") || priceStr.includes("E")) {
    throw new Error(`Invalid price format: ${priceStr}. Please enter a normal decimal number (e.g., 0.001, 1.5, 100)`)
  }

  // Parse as number and validate
  const numericPrice = Number.parseFloat(priceStr)
  console.log("[v0] numericPrice:", numericPrice)

  if (isNaN(numericPrice)) {
    throw new Error(`Invalid price: "${priceStr}" is not a valid number`)
  }

  if (numericPrice <= 0) {
    throw new Error(`Price must be greater than 0. Received: ${numericPrice}`)
  }

  // Check for extremely small numbers that might cause issues
  if (numericPrice < 0.000000001) {
    // Less than 1 Gwei
    throw new Error(`Price too small: ${numericPrice}. Minimum price is 0.000000001 BNB`)
  }

  try {
    // Use toFixed to avoid scientific notation when converting back to string
    const fixedPriceStr = numericPrice.toFixed(18).replace(/\.?0+$/, "")
    console.log("[v0] fixedPriceStr:", fixedPriceStr)

    const weiValue = ethers.parseEther(fixedPriceStr)
    console.log("[v0] weiValue:", weiValue.toString())

    return weiValue
  } catch (error) {
    console.error("[v0] ethers.parseEther error:", error)
    throw new Error(`Failed to convert price to Wei: ${error.message}. Input: ${priceStr}`)
  }
}

// Check if a sale is active
export const checkSaleStatus = async (saleId) => {
  const contract = await getContract()
  return await contract.isActive(saleId)
}

// Get sale details
export const getSaleDetails = async (saleId) => {
  const contract = await getContract()
  return await contract.salesDetailMap(saleId)
}

// Get contract balances
export const getContractBalances = async () => {
  const contract = await getContract()
  const bnbBalance = await contract.getBNBbalance()
  return { bnbBalance }
}

export const decodeContractError = (error) => {
  const errorData = error.data

  if (errorData) {
    // Common custom error signatures
    const errorSignatures = {
      "0x118cdaa7": "OwnableUnauthorizedAccount - Only contract owner can perform this action",
      "0xd1f28288": "EnforcedPause - Contract is currently paused",
      "0xfb8f41b2": "ERC20InsufficientBalance - Insufficient token balance",
      "0x13be252b": "ERC20InsufficientAllowance - Insufficient token allowance",
    }

    const signature = errorData.slice(0, 10)
    if (errorSignatures[signature]) {
      return errorSignatures[signature]
    }
  }

  return error.message || "Unknown contract error"
}

export const checkOwnership = async (userAddress) => {
  try {
    const contract = await getContract()
    const owner = await contract.owner()
    console.log("[v0] Contract owner:", owner)
    console.log("[v0] User address:", userAddress)
    return owner.toLowerCase() === userAddress.toLowerCase()
  } catch (error) {
    console.error("[v0] Error checking ownership:", error)
    return false
  }
}

export const startTokenSale = async (formData) => {
  try {
    console.log("[v0] Starting token sale with data:", formData)

    // Connect wallet and get user info
    const { signer, address } = await connectWallet()
    console.log("[v0] Connected wallet address:", address)

    // Check if user is contract owner
    const isOwner = await checkOwnership(address)
    if (!isOwner) {
      throw new Error("Only the contract owner can start token sales. Please connect with the owner wallet.")
    }

    // Get contract instance
    const contract = await getContract()

    // Check if contract is paused
    const isPaused = await contract.paused()
    if (isPaused) {
      throw new Error("Contract is currently paused. Cannot start token sale.")
    }

    // Convert and validate parameters
    const saleType = Number.parseInt(formData.saleType)
    const startTime = dateTimeToTimestamp(formData.startTime)
    const endTime = dateTimeToTimestamp(formData.endTime)
    const price = priceToWei(formData.tokenPrice)
    const minBound = priceToWei(formData.minBuy)
    const totalTokens = priceToWei(formData.totalTokens)

    console.log("[v0] Converted parameters:", {
      saleType,
      startTime,
      endTime,
      price: price.toString(),
      minBound: minBound.toString(),
      totalTokens: totalTokens.toString(),
    })

    // Validate time parameters
    const now = Math.floor(Date.now() / 1000)
    if (startTime <= now) {
      throw new Error("Start time must be in the future")
    }
    if (endTime <= startTime) {
      throw new Error("End time must be after start time")
    }

    // Estimate gas before sending transaction
    console.log("[v0] Estimating gas...")
    const gasEstimate = await contract.startTokenSale.estimateGas(
      saleType,
      startTime,
      endTime,
      price,
      minBound,
      totalTokens,
    )
    console.log("[v0] Gas estimate:", gasEstimate.toString())

    // Send transaction with extra gas buffer
    console.log("[v0] Sending transaction...")
    const tx = await contract.startTokenSale(saleType, startTime, endTime, price, minBound, totalTokens, {
      gasLimit: (gasEstimate * 120n) / 100n, // 20% buffer
    })

    console.log("[v0] Transaction sent:", tx.hash)

    // Wait for transaction confirmation
    const receipt = await tx.wait()
    console.log("[v0] Transaction confirmed:", receipt)

    // Extract sale ID from events
    let saleId = null
    if (receipt.logs) {
      for (const log of receipt.logs) {
        try {
          const parsedLog = contract.interface.parseLog(log)
          if (parsedLog && parsedLog.name === "SaleCreated") {
            saleId = parsedLog.args.saleId.toString()
            break
          }
        } catch (e) {
          // Skip unparseable logs
        }
      }
    }

    return {
      success: true,
      transactionHash: tx.hash,
      saleId: saleId,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      bscscanUrl: `https://testnet.bscscan.com/tx/${tx.hash}`,
    }
  } catch (error) {
    console.error("[v0] startTokenSale error:", error)

    // Decode custom contract errors
    if (error.code === "CALL_EXCEPTION") {
      const decodedError = decodeContractError(error)
      throw new Error(decodedError)
    }

    throw error
  }
}
