/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package NoCountry.YouTech.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Jimy
 */
@Entity
@Table(name = "tag")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Tag.findAll", query = "SELECT t FROM Tag t")
    , @NamedQuery(name = "Tag.findByIdTag", query = "SELECT t FROM Tag t WHERE t.idTag = :idTag")
    , @NamedQuery(name = "Tag.findByDescription", query = "SELECT t FROM Tag t WHERE t.description = :description")
    , @NamedQuery(name = "Tag.findByStatus", query = "SELECT t FROM Tag t WHERE t.status = :status")})
public class Tag implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_tag")
    private Integer idTag;
    @Basic(optional = false)
    @Column(name = "description")
    private String description;
    @Basic(optional = false)
    @Column(name = "status")
    private short status;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idTag", fetch = FetchType.LAZY)
    private List<BroadcastMediumTag> broadcastMediumTagList;

    public Tag() {
    }

    public Tag(Integer idTag) {
        this.idTag = idTag;
    }

    public Tag(Integer idTag, String description, short status) {
        this.idTag = idTag;
        this.description = description;
        this.status = status;
    }

    public Integer getIdTag() {
        return idTag;
    }

    public void setIdTag(Integer idTag) {
        this.idTag = idTag;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public short getStatus() {
        return status;
    }

    public void setStatus(short status) {
        this.status = status;
    }

    @XmlTransient
    public List<BroadcastMediumTag> getBroadcastMediumTagList() {
        return broadcastMediumTagList;
    }

    public void setBroadcastMediumTagList(List<BroadcastMediumTag> broadcastMediumTagList) {
        this.broadcastMediumTagList = broadcastMediumTagList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idTag != null ? idTag.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Tag)) {
            return false;
        }
        Tag other = (Tag) object;
        if ((this.idTag == null && other.idTag != null) || (this.idTag != null && !this.idTag.equals(other.idTag))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "NoCountry.YouTech.model.Tag[ idTag=" + idTag + " ]";
    }
    
}
