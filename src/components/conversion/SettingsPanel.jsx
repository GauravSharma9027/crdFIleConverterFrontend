import React from "react";

const SettingsPanel = ({ selectedFormat, onFormatChange, targetVersion, onVersionChange, corelVersions }) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
          <label className="block text-sm font-medium mb-3 text-gray-300">Output Format</label>
          <select
            value={selectedFormat}
            onChange={onFormatChange}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="cdr">CorelDRAW (CDR)</option>
            <option value="eps">Encapsulated PostScript (EPS)</option>
          </select>
        </div>
        
        {selectedFormat === 'cdr' && (
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <label className="block text-sm font-medium mb-3 text-gray-300">Target Version</label>
            <select
              value={targetVersion}
              onChange={onVersionChange}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              {corelVersions.map(version => (
                <option key={version.value} value={version.value}>
                  {version.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;