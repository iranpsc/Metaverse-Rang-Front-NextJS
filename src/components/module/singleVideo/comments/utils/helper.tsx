import axios from "axios";

export const handlerLikeComments = async (
  token: any,
  commentId: any,
  videoId: any,
  setRefreshComment: any,
  setShowAuthCard: any
) => {
  if (token) {
    console.log(token);
    try {
      const requestData = {
        data: " ",
      };
      const response = await axios.post(
        `https://api.rgb.irpsc.com/api/tutorials/${videoId}/comments/${commentId}/like`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRefreshComment((prevRefreshComment: boolean) => !prevRefreshComment);
    } catch (error: any) {
      console.error("خطا:", error?.response?.status);
      console.error("خطا:", error);
    }
  } else {
    setShowAuthCard(true);
  }
};

export const handlerDisLikeComments = async (
  token: any,
  commentId: any,
  videoId: any,
  setRefreshComment: any,
  setShowAuthCard: any
) => {
  if (token) {
    const requestData = {
      data: " ",
    };
    try {
      const response = await axios.post(
        `https://api.rgb.irpsc.com/api/tutorials/${videoId}/comments/${commentId}/dislike`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRefreshComment((prevRefreshComment: boolean) => !prevRefreshComment);
    } catch (error: any) {
      console.error("خطا:", error?.response?.status);
    }
  } else {
    setShowAuthCard(true);
  }
};

export const handlerDeleteComments = async (
  token: any,
  commentId: any,
  videoId: any,
  setRefreshComment: any,
  setShowAuthCard: any
) => {
  if (token) {
    const requestData = {
      data: " ",
    };
    try {
      const response = await axios.delete(
        `https://api.rgb.irpsc.com/api/tutorials/${videoId}/comments/${commentId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRefreshComment((prevRefreshComment: boolean) => !prevRefreshComment);
    } catch (error: any) {
      console.error("خطا:", error?.response?.status);
    }
  } else {
    setShowAuthCard(true);
  }
};

export const handlerReportComments = async (
  token: any,
  commentId: any,
  videoId: any,
  setShowAuthCard: any
) => {
  if (token) {
    const requestData = {
      content: "This is a test report content.",
    };
    try {
      const response = await axios.post(
        `https://api.rgb.irpsc.com/api/tutorials/${videoId}/comments/${commentId}/report`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: any) {
      console.error("خطا:", error?.response?.status);
    }
  } else {
    setShowAuthCard(true);
  }
};

export const handleClick = (
  itemComment: any,
  commentId: any,
  setEditMode: any,
  setEditedText: any
) => {
  setEditMode(commentId);
  setEditedText(itemComment);
};

export const handleChange = (e: any, setEditedText: any) => {
  setEditedText(e.target.value);
};

export const handleSubmit = async (
  e: any,
  videoId: any,
  commentId: any,
  token: any,
  editedText: any,
  setEditMode: any,
  setShowAuthCard: any,
  setRefreshComment: any
) => {
  e.preventDefault();
  if (token) {
    const requestData = {
      content: editedText,
      _method: "put",
    };
    try {
      const response = await axios.post(
        `https://api.rgb.irpsc.com/api/tutorials/${videoId}/comments/${commentId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRefreshComment((prevRefreshComment: boolean) => !prevRefreshComment);
    } catch (error: any) {
      console.error("خطا:", error?.response?.status);
    }
  } else {
    setShowAuthCard(true);
  }
  setEditMode(0);
};
