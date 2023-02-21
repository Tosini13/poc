type LikePropsType = {
  liked: boolean;
  disliked: boolean;
  handleLike: () => void;
  handleDislike: () => void;
};

const Like: React.FC<LikePropsType> = ({
  liked,
  disliked,
  handleLike,
  handleDislike,
}) => {
  return (
    <div data-test-id="like">
      <p
        onClick={handleLike}
        style={{ color: liked ? "tan" : "initial", cursor: "pointer" }}
      >
        Like
      </p>
      <p
        onClick={handleDislike}
        style={{ color: disliked ? "red" : "initial", cursor: "pointer" }}
      >
        Dislike
      </p>
    </div>
  );
};

export default Like;
