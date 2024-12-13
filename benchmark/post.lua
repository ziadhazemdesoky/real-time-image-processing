wrk.method = "POST"
wrk.body   = "--boundary123\r\nContent-Disposition: form-data; name=\"image\"; filename=\"sample.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n" .. io.open("sample.jpg", "rb"):read("*all") .. "\r\n--boundary123--"
wrk.headers["Content-Type"] = "multipart/form-data; boundary=boundary123"
