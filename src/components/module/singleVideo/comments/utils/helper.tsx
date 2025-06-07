import axios from "axios";

export const handlerLikeComments = async (
  token: any,
  commentId: any,
  videoId: any,
  setRefreshComment: any,
  setShowAuthCard: any
) => {
  if (token) {
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

interface ReportCommentParams {
  token: string | null;
  commentId: number;
  videoId: number;
  setShowAuthCard: (value: boolean) => void;
  setRefreshComment: React.Dispatch<React.SetStateAction<boolean>>;
  setError: (error: string | null) => void;
}

export const handlerReportComments = async ({
  token,
  commentId,
  videoId,
  setShowAuthCard,
  setRefreshComment,
  setError,
}: ReportCommentParams): Promise<void> => {
  if (!token) {
    setShowAuthCard(true);
    setError("لطفاً ابتدا وارد حساب کاربری خود شوید.");
    return;
  }

  const requestData = {
    content: "گزارش تخلف: محتوای نامناسب", // در صورت نیاز، از کاربر دریافت شود
  };

  try {
    const response = await axios.post(
      `https://api.rgb.irpsc.com/api/tutorials/${videoId}/comments/${commentId}/report`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        
      }
      
    );
    console.log("Report response:", response.data);
    setRefreshComment((prev) => !prev);
    setError(null);
  } catch (error: any) {
    console.error("خطا در گزارش کامنت:", error?.response?.status, error?.response?.data);
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      setShowAuthCard(true);
      setError("لطفاً ابتدا وارد حساب کاربری خود شوید.");
    } else {
      setError("خطایی در گزارش کامنت رخ داد. لطفاً دوباره تلاش کنید.");
    }
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
  setRefreshComment: any,
  setError: any
) => {
  e.preventDefault();
  if (!token) {
    setShowAuthCard(true);
    setError("لطفاً ابتدا وارد حساب کاربری خود شوید.");
    return;
  }
  if (!editedText.trim()) {
    setError("متن کامنت نمی‌تواند خالی باشد.");
    return;
  }

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
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response:", response.data);
    setRefreshComment((prev: boolean) => !prev);
    setEditMode(0);
  } catch (error: any) {
    console.error("خطا در ویرایش کامنت:", error?.response?.status, error?.response?.data);
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      setShowAuthCard(true);
      setError("لطفاً ابتدا وارد حساب کاربری خود شوید.");
    } else {
      setError("خطایی در ویرایش کامنت رخ داد. لطفاً دوباره تلاش کنید.");
    }
  }
};
