import React, { useEffect, useRef } from "react"
import { Diff2HtmlUI } from "diff2html/lib/ui/js/diff2html-ui-slim.js"

const configuration = {
  drawFileList: true,
  fileListToggle: false,
  fileListStartVisible: false,
  fileContentToggle: false,
  matching: "lines",
  outputFormat: "line-by-line",
  synchronisedScroll: true,
  highlight: true,
  renderNothingWhenEmpty: false,
}

function prepareRequest(url) {
  let fetchUrl
  const headers = new Headers()

  const githubCommitUrl = /^https?:\/\/(?:www\.)?github\.com\/(.*?)\/(.*?)\/commit\/(.*?)(?:\.diff)?(?:\.patch)?(?:\/.*)?$/
  const githubPrUrl = /^https?:\/\/(?:www\.)?github\.com\/(.*?)\/(.*?)\/pull\/(.*?)(?:\.diff)?(?:\.patch)?(?:\/.*)?$/

  const gitlabCommitUrl = /^https?:\/\/(?:www\.)?gitlab\.com\/(.*?)\/(.*?)\/commit\/(.*?)(?:\.diff)?(?:\.patch)?(?:\/.*)?$/
  const gitlabPrUrl = /^https?:\/\/(?:www\.)?gitlab\.com\/(.*?)\/(.*?)\/merge_requests\/(.*?)(?:\.diff)?(?:\.patch)?(?:\/.*)?$/

  const bitbucketCommitUrl = /^https?:\/\/(?:www\.)?bitbucket\.org\/(.*?)\/(.*?)\/commits\/(.*?)(?:\/raw)?(?:\/.*)?$/
  const bitbucketPrUrl = /^https?:\/\/(?:www\.)?bitbucket\.org\/(.*?)\/(.*?)\/pull-requests\/(.*?)(?:\/.*)?$/

  function gitLabUrlGen(userName, projectName, type, value) {
    return (
      "https://crossorigin.me/https://gitlab.com/" +
      userName +
      "/" +
      projectName +
      "/" +
      type +
      "/" +
      value +
      ".diff"
    )
  }

  function gitHubUrlGen(userName, projectName, type, value) {
    headers.append("Accept", "application/vnd.github.v3.diff")
    return (
      "https://api.github.com/repos/" +
      userName +
      "/" +
      projectName +
      "/" +
      type +
      "/" +
      value
    )
  }

  function bitbucketUrlGen(userName, projectName, type, value) {
    const baseUrl = "https://bitbucket.org/api/2.0/repositories/"
    if (type === "pullrequests") {
      return (
        baseUrl +
        userName +
        "/" +
        projectName +
        "/pullrequests/" +
        value +
        "/diff"
      )
    }
    return baseUrl + userName + "/" + projectName + "/diff/" + value
  }

  let values
  if ((values = githubCommitUrl.exec(url))) {
    fetchUrl = gitHubUrlGen(values[1], values[2], "commits", values[3])
  } else if ((values = githubPrUrl.exec(url))) {
    fetchUrl = gitHubUrlGen(values[1], values[2], "pulls", values[3])
  } else if ((values = gitlabCommitUrl.exec(url))) {
    fetchUrl = gitLabUrlGen(values[1], values[2], "commit", values[3])
  } else if ((values = gitlabPrUrl.exec(url))) {
    fetchUrl = gitLabUrlGen(values[1], values[2], "merge_requests", values[3])
  } else if ((values = bitbucketCommitUrl.exec(url))) {
    fetchUrl = bitbucketUrlGen(values[1], values[2], "commit", values[3])
  } else if ((values = bitbucketPrUrl.exec(url))) {
    fetchUrl = bitbucketUrlGen(values[1], values[2], "pullrequests", values[3])
  } else {
    fetchUrl = url
  }
  return {
    url: fetchUrl,
    headers: headers,
  }
}

async function getDiff(request) {
  try {
    const result = await fetch(request.url, {
      method: "GET",
      headers: request.headers,
      mode: "cors",
      cache: "default",
    })
    return result.text()
  } catch (error) {
    console.error("Failed to retrieve diff", error)
    throw error
  }
}

export const DiffRender = ({ url }) => {
  const myElementRef = useRef(null)
  useEffect(async () => {
    const request = prepareRequest(url)
    const diffString = await getDiff(request)
    if (myElementRef.current) {
      const diff2htmlUi = new Diff2HtmlUI(
        myElementRef.current,
        diffString,
        configuration
      )
      diff2htmlUi.draw()
    }
  }, [])
  return <div ref={myElementRef}></div>
}
