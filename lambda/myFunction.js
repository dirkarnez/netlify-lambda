exports.handler = async function () {
  return {
    statusCode: 200,
    body: `
   <!DOCTYPE html>
<html>
<body>
 <script src="//mozilla.github.io/pdf.js/build/pdf.mjs" type="module"></script>

<script type="module">
  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.
  var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';

  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  var { pdfjsLib } = globalThis;

  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.mjs';

  // Asynchronous download of PDF
  var loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');

    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function(page) {
      console.log('Page loaded');

      var scale = 1.5;
      var viewport = page.getViewport({scale: scale});

      // Prepare canvas using PDF page dimensions
      var canvas = document.getElementById('the-canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        console.log('Page rendered');
      });
    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });
</script>

<h1>PDF.js 'Hello, world!' example</h1>

<p>Please use <a href="https://mozilla.github.io/pdf.js/getting_started/#download"><i>official releases</i></a> in production environments.</p>

<canvas id="the-canvas"></canvas>

</body>
</html>


    `,
  };
};
