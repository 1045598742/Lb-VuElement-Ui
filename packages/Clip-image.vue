<template>
  <div class="lb-clip_image">
    <div @click="upload" class="lb-upload_button">
      上传
    </div>
    <input
      v-show="false"
      type="file"
      accept="image/*"
      @change="fileChange"
      ref="file"
    />
    <canvas
      v-show="false"
      :width="maxWidth"
      :height="height"
      class="canvans"
      ref="canvans"
    ></canvas>
  </div>
</template>
<script>
export default {
  name: "lb-clip-image",
  props: {
    type: {
      type: String,
      default: "base64",
    },
    maxHeight: {
      type: Number,
      default: 500,
    },
    maxWidth: {
      type: Number,
      default: 750,
    },
    slice: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      height: 0,
      img: "",
      heightList: [],
      list: [],
      canvansHeight: 0,
      imgList: [],
      lastModified: null,
    };
  },

  methods: {
    // 点击上传
    upload() {
      this.$refs.file.click();
    },

    // 读取文件 file：文件
    fileChange(file) {
      const fileOne = file.target.files[0];
      this.lastModified = fileOne.lastModified;
      if (!fileOne) return; // 没有文件直接退出
      let reader = new FileReader(); // 创建文件读取对象
      reader.onload = () => {
        this.imageHandler(reader); // 加载成功后处理图片
      };
      reader.readAsDataURL(fileOne); // 读取文件为base64
    },

    // 获取文件尺寸信息
    imageHandler(reader) {
      const src = reader.result;
      this.$emit("preview-src", src);
      this.img = new Image();
      this.img.src = src;
      this.img.onload = () => {
        const { maxWidth, maxHeight } = this;
        let { width, height } = this.img; // 获取图片宽高
        let proportion = width / maxWidth; // 获取图片比例
        this.height = height / proportion; // 获取canvan元素应该生成的高度
        let frequency = this.slice ? Math.ceil(this.height / maxHeight) : 1; // 获取图片切块的块数
        this.heightList = []; //清空高度计算列表
        for (let i = 0; i < frequency; i++) {
          let imgAttribute = {
            from: i * maxHeight, // 每一块图片开始的高度位置
          };
          imgAttribute.to =
            i * maxHeight +
            (i < frequency - 1 ? maxHeight : this.height - i * maxHeight); // 每一块图片结束的高度位置
          this.heightList.push(imgAttribute);
        }
        this.$nextTick(() => {
          this.drawImage(); // 使用canvans进行绘图
        });
      };
    },

    // canvan 绘图
    drawImage() {
      let canvansElement = this.$refs.canvans.getContext("2d");
      canvansElement.clearRect(0, 0, this.maxWidth, this.height); // 清空canvans画布
      canvansElement.fillStyle = "#fff";
      canvansElement.fillRect(0, 0, this.maxWidth, this.height); // 画布填充底色
      canvansElement.drawImage(this.img, 0, 0, this.maxWidth, this.height); // 绘制图片
      this.imgList = []; // 重置图片列表
      this.heightList.forEach(({ from, to }, index) => {
        // 循环生成图片
        let imageData = canvansElement.getImageData(0, from, this.maxWidth, to); // 获取图片每一块应该画出的文件
        let canvans = document.createElement("canvas"); // 此canvans元素是为了获取图片base64编码
        const canvansCTX = canvans.getContext("2d");
        canvans.height = to - from; // 获取每一块的高度
        canvans.width = this.maxWidth;
        canvansCTX.putImageData(
          imageData,
          0,
          0,
          0,
          0,
          this.maxWidth,
          to - from
        ); //  将图片数据放到画布
        let base64 = canvans.toDataURL("image/jpeg",0.6); // 生成base64编码
        let resultData = this.base64Handler(base64, index); // 处理成需要的文件格式
        this.imgList.push(resultData);
      });
      this.$emit("finish", this.imgList);
    },

    // 转换图片数据格式
    base64Handler(base64, index) {
      let imgData = base64;
      if (this.type === "file" || this.type == "formData") {
        // 如果不需要base64 只需要file文件
        imgData = this.dataURLtoBlob(base64, `image-${index}`);
        // imgData = this.blobToFile(imgData,`image-${index}`)
        if (this.type == "formData") {
          // 如果需要formdata对象
          let param = new FormData();
          param.append("name", `image-${index}`);
          param.append("file", imgData); //通过append向form对象添加数据
          imgData = param;
        }
      }
      return imgData;
    },

    //将base64转换为blob
    dataURLtoBlob(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      try {
        // 支持File构造函数
        return new File([u8arr], filename, { type: mime });
      } catch (error) {
        //   使用Blob对象
        let blob = new Blob([u8arr], { type: mime });
        return this.blobToFile(blob, filename);
      }
    },
    // Blob对象增加属性
    blobToFile(theBlob, fileName) {
      theBlob.lastModified = this.lastModified;
      theBlob.lastModifiedDate = new Date(this.lastModified);
      theBlob.name = fileName;
      return theBlob;
    }
  }
}
</script>
