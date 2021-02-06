/**
 * Component to return the comment given by the user
 */

const Comment = ({ comment }) => {
    return (`<ul data-userId="${comment.userId}" data-comment-id="${comment.body}">
            <li>
                <div>
                    <span>title</span>
                    <span>${comment.title}</span>
                </div>
            </li>
            <li>
                <div>
                    <span>body</span>
                    <span>${comment.body}</span>
                </div>
            </li>
        </ul>`);
};

export default Comment;