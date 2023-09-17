import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isLoggedIn: false,
    newSignup: false,
    openCreateAccountModal: false,
    passwordCreated: true,
    updateProfile: false,
    userDetails: {
      name: "No name",
      email: "email",
      accessToken: null,
      refreshToken: null,
      userId: null,
    },
    marketplaceEmail: null,
    mainnet: false,
    isDarkMode: true,
    darkText: "#e5e7eb",
    lightText: "#374151",
    authToken: null,
    blockchain: "",
    marketType: null,
    marketplaceId: null,
    tokenDetails: null,
    marketplace: null,
    walletAddress: [{ address: "loading ..." }],
    walletDetails: null,
    wealthManager: null,
    nftList: [],
    nftId: "",
    domain: "",
    nftData: {
      type: "",
      ipfsHash: "",
      assetId: "",
      s3url: "",
      assetType: "",
      ipfsUrl: "",
      extension: "",
    },
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },

    updateUserDetails(state, action) {
      const email = action.payload.email
        ? action.payload.email
        : state.userDetails.email;
      const name = action.payload.name
        ? action.payload.name
        : state.userDetails.name;
      const accessToken = action.payload.accessToken
        ? action.payload.accessToken
        : state.userDetails.accessToken;
      const refreshToken = action.payload.refreshToken
        ? action.payload.refreshToken
        : state.userDetails.refreshToken;
      const userId = action.payload.userId
        ? action.payload.userId
        : state.userDetails.userId;

      state.userDetails = {
        userId,
        email,
        name,
        accessToken,
        refreshToken,
      };
    },
    setNftData(state, action) {
      const type = action.payload.type;
      const ipfsHash = action.payload.ipfsHash;
      const assetType = action.payload.assetType;
      const s3url = action.payload.s3url;
      const assetId = action.payload.assetId;
      const ipfsUrl = action.payload.ipfsUrl;
      const extension = action.payload.extension;

      state.nftData = {
        type,
        ipfsHash,
        assetId,
        s3url,
        assetType,
        ipfsUrl,
        extension,
      };
    },
    setMarketplaceId(state, action) {
      state.marketplaceId = action.payload;
    },
    setCreateAccountModal(state, action) {
      state.openCreateAccountModal = action.payload;
    },
    setTokenDetails(state, action) {
      state.tokenDetails = action.payload;
    },
    setWalletAddress(state, action) {
      state.walletAddress = action.payload;
    },
    setWalletDetails(state, action) {
      state.walletDetails = action.payload;
    },
    setWealthManager(state, action) {
      state.wealthManager = action.payload;
    },
    updateAuthToken(state, action) {
      state.authToken = action.payload;
    },
    toggleNewSignup(state) {
      state.newSignup = !state.newSignup;
    },
    togglePasswordCreated(state) {
      state.passwordCreated = !state.passwordCreated;
    },
    mainnet(state, action) {
      state.mainnet = action.payload;
    },
    setMarketplaceEmail(state, action) {
      state.marketplaceEmail = action.payload;
    },
    toggleUpdateProfile(state) {
      state.updateProfile = !state.updateProfile;
    },
    setBlockChain(state, action) {
      state.blockchain = action.payload;
    },
    setMarketType(state, action) {
      state.marketType = action.payload;
    },
    setMarketplace(state, action) {
      state.marketplace = action.payload;
    },
    setDomain(state, action) {
      state.domain = action.payload;
    },
    setNftList(state, action) {
      state.nftList = action.payload;
    },
    //this nftId is set in qrCodeGenerator component
    setNftId(state, action) {
      state.nftId = action.payload;
    },
  },
});

const appActions = appSlice.actions;

export { appActions };
export default appSlice;
