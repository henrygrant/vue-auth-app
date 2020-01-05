<template>
<div class="file">
  <form 
      enctype="multipart/form-data"
  >
    <div class="fields">
      <input 
          type="file"
          ref="file"
          accept="image/*"
          @change="onSelect"  
      />
    </div>
    <div class="message">
      <div>{{message}}</div>
      <div v-if="imageUrl">
        <img :src="imageUrl" class="uploadedImage"/>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import FileUploadService from '@/services/FileUploadService'
export default {
  name: 'FileUpload',
  props: {
    onComplete: { type: Function }
  },
  data () {
    return {
      imageUrl: '',
      message: ''
    }
  },
  methods: {
    async onSelect () {
      const formData = new FormData()
      formData.append('file', this.$refs.file.files[0])
      try {
        let resp = await FileUploadService.post(formData)
        this.imageUrl = resp.data.file.path
        this.onComplete(this.imageUrl)
      } catch (err) {
        console.log(err)
        this.message = 'Upload failed!'
      }
    }
  }
}
</script>

<style scoped>
.uploadedImage {
  width: 100%;
}
.message {
  margin-top: 10px;
}
</style>
