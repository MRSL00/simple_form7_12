$(document).ready(() => {
  function Show_err_user() {
    $(".input-user").css("border-color", "red");
    $(".d-none").css("display", "block");
    $(".input-user").addClass("prp");
    $(".cen-user").append("<i class='fa fa-times d-none icon-user'></i>");
    $(".fa-times").css({
      position: "relative",
      color: "red",
      left: "398px",
      top: "11px",
      "margin-right": "-13px",
    });
  }
  function Show_err_pass() {
    $(".input-pass").css("border-color", "red");
    $(".d-none").css("display", "block");
    $(".input-pass").addClass("prp");
    $(".cen-pass").append("<i class='fa fa-times d-none icon-pass'></i>");
    $(".fa-times").css({
      position: "relative",
      color: "red",
      left: "398px",
      top: "11px",
      "margin-right": "-13px",
    });
  }
  $(".input-user").click(() => {
    $("i").remove(".icon-user");
  });
  $(".input-pass").click(() => {
    $("i").remove(".icon-pass");
  });
  $("button").click((e) => {
    e.preventDefault()
    if ($(".input-user").val() === "") {
      Show_err_user();
      $(".msg-user").text("الزامی*");
    } else {
      $("i").remove(".icon-user");
      $(".msg-user").text("");
      $(".input-user").css("border-color", "white");
      $(".input-user").removeClass("prp");
    }
    if ($(".input-pass").val() === "") {
      Show_err_pass();
      $(".msg-pass").text("الزامی*");
    } else {
      $("i").remove(".icon-pass");
      $(".msg-pass").text("");
      $(".input-pass").css("border-color", "white");
      $(".input-user").removeClass("prp");
    }
    if ($(".input-pass").val() !== "" && $(".input-user").val() !== "") {
      let User_info = { "userName":$(".input-user").val() , "password": $(".input-pass").val() };
      console.log(User_info)
      $.ajax({
        type: "post",
        url: "/user",
        data: JSON.stringify(User_info),
        // dataType: "dataType",
        success: function (response) {
          if(JSON.parse(response).flag){
            alert("ورود موفقیت امیز");
          }else{
            alert("کاربری با این مشخصات وجود ندارد")
          }
        }
      });
    }
  });
});
