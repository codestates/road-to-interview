module.exports = (req, res) => {
  console.log(req.files);
  if (req.files.length < 1) {
    res.send({ message: "사진 형식이 잘못되어 등록에 실패하였습니다." });
  }
  let images = [];
  for (let i of req.files) {
    images.push(i.location);
  }

  res.status(201).send({ images: images, message: "사진 등록 되었습니다." });
};
