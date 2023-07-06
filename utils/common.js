import { sequelize } from "../middleware/_db.js";
export const calculateReadTime = (text) => {
  // Assuming average reading speed of 200 words per minute
  const averageReadingSpeed = 200;

  // Split the text into an array of words
  const words = text?.split(" ");

  // Calculate the number of words
  const wordCount = words?.length;

  // Calculate the estimated read time in minutes
  const readTime = Math.ceil(wordCount / averageReadingSpeed);

  return readTime;
};

export const getDeviceTokenByUserId = async (userId) => {
  try {
    const request = await sequelize.query(
      "EXEC GetDeviceTokenByUserId @UserId=:userId",
      {
        replacements: {
          userId,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const response = request[0];

    if (response.error === 0) {
      return {
        error: false,
        message: response.message,
        deviceToken: response.deviceToken,
        full_name: response.full_name,
      };
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.log('Error retrieving device token:', error.message);
    return {
      error: true,
      message: 'Error retrieving device token',
      deviceToken: null,
      full_name: null,
    };
  }
};


export const GetDeviceTokensByMultipalUserIds = async (userIds) => {
  try {
    const request = await sequelize.query(
      "EXEC GetDeviceTokensByMultipalUserIds @UserIds=:userIds",
      {
        replacements: {
          userIds,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const response = request[0];

    if (response.error === 0) {
      return {
        error: false,
        message: response.message,
        deviceTokens: request.slice(1),
      };
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.log('Error retrieving device tokens:', error.message);
    return {
      error: true,
      message: 'Error retrieving device tokens',
      deviceTokens: [],
    };
  }
};


