console.log("Comments script loaded");

let createComment = function () {
  let commentForm = $("#post-comment-form");
  commentForm.submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "/comments/create",
      data: commentForm.serialize(),
      success: function (data) {
        console.log(data);
        let newComment = commentDom(data.data.comment);
        $(`.post-comment-${data.data.comment.post}`).prepend(newComment);
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  });
};

let commentDom = function (comment) {
  return $(`<li>
    <p>
      <a href="/comments/destroy/${comment.id}"><strong>x</strong></a>
      ${comment.content}
      <br />
      <small> ${comment.user.name} </small>
    </p>
  </li>
  `);
};

createComment();
